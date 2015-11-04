class FoodCart < ActiveRecord::Base
  include PgSearch
  pg_search_scope :search, against: [:name, :address, :zip ],
                           using: { tsearch: { prefix: true, dictionary: "english" }},
                           ignoring: [:accents]

  has_many :tags
  has_many :reviews
  validates :name, presence: true
  validates :address, presence: true
  validates :zip, presence: true
  validates :monday_hours, presence: true
  validates :tuesday_hours, presence: true
  validates :wednesday_hours, presence: true
  validates :thursday_hours, presence: true
  validates :friday_hours, presence: true
  validates :saturday_hours, presence: true
  validates :sunday_hours, presence: true

  def self.text_search(query)
    if query.present?
      search(query)
    else
      FoodCart.all
    end
  end
end
