class CourseController < ApplicationController
    before_action :authenticate_user!

  # GET /plans/1 or /plans/1.json
  def show
    @course = Course.find(params[:id])
    respond_to do |format|
      format.html
      format.json { render json: @course }
    end
  end
end
