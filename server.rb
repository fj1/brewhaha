require 'sinatra'
require 'json'
require 'brewery_db'
require 'sinatra/reloader'
require './config/brewery.rb'
require 'dotenv'
Dotenv.load

# for vagrant
set :bind, '0.0.0.0'

# Caching
$searchCache = {}

def search(params)
  puts params
  # Compose cache key
  key = "#{params[:locality]};#{params[:region]};#{params[:locationTypeDisplay]}"

  # First check if the key exists in cache (searchCache)
  if $searchCache.include?(key)
    # If it's there, just return the result
    return $searchCache[key]
  # Otherwise
  else
    # Make Brewery API call
    brewery_db = BreweryDB::Client.new do |config|
      config.api_key = ENV['BREWERY_API_KEY']
    end
    api_resp = brewery_db.locations.all(params)

    # Save results in cache (setting the api result to the value)
    $searchCache[key] = api_resp
    # Return the result
    return api_resp
  end
end

helpers do
  def states
    [ "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
      "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
      "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
      "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
      "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
      "New Hampshire", "New Jersey", "New Mexico", "New York",
      "North Carolina", "North Dakota", "Ohio", "Oklahoma",
      "Oregon", "Pennsylvania", "Rhode Island",
      "South Carolina", "South Dakota",
      "Tennessee", "Texas", "Utah",
      "Vermont", "Virginia",
      "Washington",
      "West Virginia",
      "Wisconsin", "Wyoming"]
  end

  def locType 
    [ "Micro Brewery", "Macro Brewery", "Brewpub",
      "Tasting", "Restaurant", "Cidery", "Meadery"]
  end
end

get '/' do
  erb :index
end

get '/query' do
  # puts params

  api_resp = search(params)

  # puts @map_data

  # tangent!
  # couldn't use json parse and instead used .inspect
  # because of the way the gem returned a class and not a json
  # puts api_resp.inspect

  # then iterate thru api_resp HASH to grab necessary info and save into @map_data
  @map_data = []
  api_resp.each do |x|
    @map_data.push({ :brewery_name => x.brewery.name, 
      :brewery_lat => x.latitude,
      :brewery_lng => x.longitude,
      :brewery_addr => x.streetAddress,
      :brewery_ext_addr => x.extendedAddress,
      :brewery_city => x.locality,
      :brewery_state => x.region,
      :brewery_country => x.countryIsoCode,
      :brewery_zipcode => x.postalCode,
      :brewery_phone => x.phone,
      :brewery_type => x.locationTypeDisplay,
      # :brewery_isOrganic => x.brewery.isOrganic,
      :brewery_website => x.website,
      :brewery_phone => x.phone,
      :brewery_hours => x.hoursOfOperation,
      :brewery_tours => x.tourInfo
    })
  end

  # sets the type of the content to json
  content_type :json
  # converts mapData to json
  @map_data.to_json

end # end get '/query'








