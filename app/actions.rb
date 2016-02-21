before '/pages/:slug' do |slug|
  @page = Page.find_by(slug: slug)
end

helpers do
  def markdown(text)
    RDiscount.new(text).to_html
  end
end

get '/' do
  erb :index
end

get '/pages' do
  @page_number = params[:p] ? params[:p].to_i : 1
  @pages = Page.page_number(@page_number)
  if params[:search][:q]
    @pages = @pages.search(params[:search][:q])
  end
  erb :'pages/index'
end

post '/pages' do
  # TODO
end

get '/pages/new' do

end

get '/pages/:slug/edit' do |slug|

end

get '/pages/:slug' do |slug|
  erb :'pages/show'
end

put '/pages/:slug' do |slug|
  # TODO
end

delete '/pages/:slug' do |slug|
  # TODO
end
