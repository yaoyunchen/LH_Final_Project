class Page < ActiveRecord::Base

  DEFAULT_PAGE_SIZE = 20

  default_scope { order(:title).limit(DEFAULT_PAGE_SIZE) }

  scope :page_number, -> (p) { offset((p - 1) * DEFAULT_PAGE_SIZE) }

  scope :search, -> (q) { where('title LIKE :query OR content LIKE :query', query: "%#{q}%") }

end
