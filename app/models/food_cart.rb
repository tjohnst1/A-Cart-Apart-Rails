class FoodCart < ActiveRecord::Base
  include PgSearch
  pg_search_scope :search, against: [:name, :address ],
                           using: { tsearch: { prefix: true, dictionary: "english" }},
                           ignoring: [:accents],
                           associated_against: { tags: :name }

  geocoded_by :address
  after_validation :geocode

  has_many :reviews
  acts_as_taggable

  validates :name, presence: true
  validates :address, presence: true

  private

  def self.text_search(query)
    if query.present?
      search(query)
    else
      FoodCart.all
    end
  end

  def default_values
    self.phone_number ||= "Not Provided"
    self.website ||= "Not Provided"
    self.monday_hours ||= "Closed"
    self.tuesday_hours ||= "Closed"
    self.wednesday_hours ||= "Closed"
    self.thursday_hours ||= "Closed"
    self.friday_hours ||= "Closed"
    self.saturday_hours ||= "Closed"
    self.sunday.hours ||= "Closed"
  end

end
