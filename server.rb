require 'sinatra'
require 'json'
require 'brewery_db'
require 'sinatra/reloader'
require './config/brewery.rb'
require 'dotenv'
Dotenv.load

# for vagrant
set :bind, '0.0.0.0'

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
    [ "Micro", "Macro", "Brewpub",
      "Tasting", "Restaurant", "Cidery", "Meadery"]
  end
end

get '/' do
  erb :index
end

# server.rb queries api
get '/query' do

  brewery_db = BreweryDB::Client.new do |config|
    config.api_key = ENV['BREWERY_API_KEY']
  end

  # querying the api
  # TO-DO: GET THIS TO RESPOND TO USER INPUT
  # HAVE LOGIC TO DECIDE WHICH CALLS TO API TO MAKE
  puts params

  api_resp = brewery_db.locations.all( 
    params
  )

  # couldn't use json parse and instead used .inspect
  # because of the way the gem returned a class and not a json
  puts api_resp.inspect

  # then iterate thru api_resp HASH to grab necessary info and save into @map_data
  @map_data = []
  api_resp.each do |x|
    @map_data.push({ :brewery_name => x.brewery.name, 
      :brewery_lat => x.latitude,
      :brewery_lng => x.longitude,
      :brewery_addr => x.streetAddress,
      :brewery_city => x.locality,
      :brewery_state => x.region,
      :brewery_country => x.countryIsoCode,
      :brewery_zipcode => x.postalCode,
      :brewery_phone => x.phone,
      :brewery_type => x.locationTypeDisplay,
      :brewery_isOrganic => x.brewery.isOrganic
    })
  end

  puts @map_data

  # sets the type of the content to json
  content_type :json
  # converts mapData to json
  @map_data.to_json

end # end get '/query'








