module ApplicationHelper
  def flashToAlertClass(key)
    case key
      when "message"
        "alert-success"
      when "warning"
        "alert-danger"
      else
        "alert-info"
      end
  end
  def add_query(category)
    if params[:query]
      "#{params[:query]}&#{category}"
    else
      category
    end
  end
end
