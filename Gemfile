source "https://rubygems.org"

gem "jekyll", "~> 4.1.1"

group :jekyll_plugins do
  gem "html-proofer"
  gem "jekyll-feed"
  gem "jekyll-get-json", git: "https://github.com/albertvolkman/jekyll-get-json"
  gem "jekyll-datapage-generator", :git => "https://github.com/avillafiorita/jekyll-datapage_gen.git", :branch => "master"
  gem "jekyll-local-theme"
  gem "jekyll-menus"
  gem "jekyll-paginate-v2", :git => "https://github.com/albertvolkman/jekyll-paginate-v2.git", :branch => "theme_layouts"
  gem 'jekyll-redirect-from'
  gem "jekyll-remote-theme", :git => "https://github.com/benbalter/jekyll-remote-theme.git", :branch => "master"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]
