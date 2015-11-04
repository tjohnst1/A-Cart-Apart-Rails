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
end
