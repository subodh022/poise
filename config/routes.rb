Rails.application.routes.draw do
  resources :attendances
  resources :hourly_outputs
  resources :op_reworks
  resources :machine_downtimes
  devise_for :users
  resources :work_stations
  resources :operation_bulletins do
    member do
      get "manage" => "operation_bulletins#manage"
      get "generate" => "operation_bulletins#generate"
      get "get_work_stations" => "operation_bulletins#get_work_stations"
    end
  end
  resources :machines
  resources :skills
  resources :operators
  resources :operations
  resources :sections do
    member do
      put 'enable'
    end
  end
  resources :lines do
    member do
      get 'get_sections'
    end
  end

  post "operators/update_skill" => "operators#update_skill"
  get "get_lines" => "lines#get_lines"
  get "get_ob_list" => "operation_bulletins#get_ob_list"
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'lines#index'

  get 'logout' => 'devise/sessions#destroy'

  namespace "api" do
    namespace "v1" do
      resources :work_stations
      resources :lines
      resources :operation_bulletins
    end
  end

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
