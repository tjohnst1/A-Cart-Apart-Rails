class AddTrigramAndFuzzyStringMatchExtensions < ActiveRecord::Migration
  def change
    execute "CREATE EXTENSION fuzzystrmatch"
    execute "CREATE EXTENSION pg_trgm"
  end
end
