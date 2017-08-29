class MessageSummary(object):
    def __init__(self,fromUserId,fromUserName,messageCount):
        self.fromUserId = fromUserId
        self.fromUserName = fromUserName
        self.messageCount= messageCount
    
    def toJson(self):
        return {
            'fromUserId':str(self.fromUserId),
            'fromUserName':self.fromUserName,
            'messageCount':str(self.messageCount)
        }