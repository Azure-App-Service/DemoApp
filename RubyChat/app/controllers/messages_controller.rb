class MessagesController < ApplicationController

  def index
    messages = Message.all
    render json: messages
  end

  def unread
    from = params[:from]
    to = params[:to]

    last_read_message_id = get_last_read_messages_id(to, from)
    unread_messages = Message
      .where(:to => to, :from => from)
      .where('id > ?', last_read_message_id)
      .order('id')

    last_unread_message = unread_messages.last()
    if last_unread_message
      update_last_read_message_id(to, from, last_unread_message.id)
    end

    render json: unread_messages
  end

  def summary
    to = params[:to]
    summary = get_messages_summary(to)
    render json: summary
  end

  def create
    message = Message.create(
        from: params[:from],
        to: params[:to],
        body: params[:body]    
    )
    render json: message, status: :created
  end

  private 

  def get_messages_summary(to)
    records = MessageReadRecord.where(:to => to)

    # part 1
    filter = records
      .map{ |r| "(\"from\" = #{r.from} and \"id\" > #{r.last_read_message_id})" }
      .join(" or ")      
    unread_message_count_hash_part_1 = Message
      .where(:to => to)
      .where(filter)
      .group(:from)
      .count
    
    # part 2
    recorded_from = records.map{|r|r.from}
    unread_message_count_hash_part_2 = Message
      .where(:to => to)
      .where.not(:from => recorded_from)
      .group(:from)
      .count

    # result
    unread_message_count_hash_part_1
      .merge(unread_message_count_hash_part_2)
      .map{|from, count|{
        from: from,
        unread_messages_count: count
      }}
    
  end

  def get_last_read_messages_id(to, from)
    record = MessageReadRecord
      .where(:to => to, :from => from)
      .first()
    record ? record.last_read_message_id : -1
  end

  def update_last_read_message_id(to, from, last_read_message_id)
    record = MessageReadRecord.where(:to => to, :from => from).first_or_create
    record.last_read_message_id = last_read_message_id
    record.save()
  end

end