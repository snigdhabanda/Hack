class User < ApplicationRecord
    validates :email, :image_url, :display_name, :password_digest, :session_token, presence: true
    validates :email, :session_token, uniqueness: true 
    validates :password, length: {minimum: 7, allow_nil: true}

    attr_reader :password 
    before_validation :ensure_session_token

    # has_many :authored_messages,
    # foreign_key: :author_id,
    # class_name: :Message

    # has_many :received_messages,
    # foreign_key: :recipient_id,
    # class_name: :Message

    has_many :channel_members,
    foreign_key: :member_id,
    class_name: :ChannelMember

    has_many :channels,
    through: :channel_members,
    source: :channel 

    # has_many :dms,
    # foreign_key: :dm_member_id,
    # class_name: :Dm

   

    
    #find a user in the database 
    def self.find_by_credentials(email, password)
        @user = User.find_by(email: email)
        return nil if @user.nil?
        @user.is_password?(password) ? @user : nil 
    end 

    #generating a password from user login credentials
    #generating a hashed password
    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end  

    #password validation
    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end 

    #generate a secure session token
    def reset_session_token!   
        self.session_token = SecureRandom::urlsafe_base64
        self.save! 
        self.session_token
    end 

    #assign a session token, before validating user credentials
    def ensure_session_token 
        self.session_token ||= SecureRandom::urlsafe_base64
    end 
end
