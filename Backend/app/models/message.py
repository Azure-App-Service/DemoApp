class Message(object):

    def __init__(self,id,fromUser,toUser,content,created):
        self.id = id
        self.fromUser = fromUser
        self.toUser = toUser
        self.content = content
        self.created = created

    def to_json(self):
        return {
            'id': str(self.id), 
            'fromUser': str(self.fromUser),
            'toUser': str(self.toUser),
            'content':self.content,
            'created':self.created
        }