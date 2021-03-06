Rails.application.routes.draw do
  resources :attendances
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
      resources :work_stations, only: [:index] do
        get "downtime"
        get "rework"
        get "output"
      end
      resources :lines, only: [:index]
      resources :sections, only: [:index]
      resources :operation_bulletins, only: [:index]
      resources :machine_downtimes, only: [:index, :create]
      resources :op_reworks, only: [:index, :create]
      resources :hourly_outputs, only: [:index, :create]
      resources :attendances, only: [:index, :create]

      namespace "reports" do
        get "downtime"
        get "rework"
        get "output"
        get "section_output"
        get "attendance"
      end

      namespace "dynamic_balancing" do
        get "ws_list"
        get "ws_details"
        get "ws_mac_details"
        get "ws_db_list"
        post "create_deviation"
        post "create_mac_deviation"
      end

      get "working_hours" => "reports#working_hours"
      post "record_attendance" => "work_stations#record_attendance"
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
