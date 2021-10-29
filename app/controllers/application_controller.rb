class ApplicationController < ActionController::Base

    helper_method :logged_in?, :current_user

    def login!(user)
        @current_user = user 
        session[:session_token] = user.reset_session_token!
    end 

    def logout
        current_user.reset_session_token! 
        session[:session_token] = nil 
    end 

    def current_user
        @current_user ||= User.find_by(session_token: session[:session_token]) 
    end 

    def logged_in?
        !!current_user 
    end 

    def require_logged_in 
        redirect_to root_url if current_user.nil?
    end 
 

end
