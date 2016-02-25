# Homepage (Root path)

configure do
  set :views, Proc.new { root }
end

get '/' do
  erb :'index.html'
end
