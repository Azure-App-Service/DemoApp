Rails.application.routes.draw do
  scope '/api' do
    resources :messages do #, only: [:index, :create]
      collection do
        get 'unread'
        get 'summary'
      end      
    end
  end
end
