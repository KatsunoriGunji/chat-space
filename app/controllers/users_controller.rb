class UsersController < ApplicationController
  def index
    @users = params[:keyword] == "" ? {} : User.where("name LIKE ?", "#{params[:keyword]}%")
    @user_id = params[:user_id] == "" ? {} : params[:user_id]
    @user_name = params[:user_name] == "" ? {} : params[:user_name]
    respond_to do |format|
      format.html {redirect_to new_group_path}
      format.json
    end
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private
  def user_params
    params.require(:user).permit(:name, :email)
  end
end
