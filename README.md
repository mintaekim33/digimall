# Digimall
An online e-commerce website to demonstrate CRUD requests  
Customers can add products to the cart and update the item quantities in the cart. The items can be removed from the cart as well  
Searchbar is available to filter the products by product name  
Basic login and signup pages are added to demo regex pattern  
Dark mode is implemented using useContext hook  

# Screenshots
<img width="500" alt="Screenshot 2023-11-25 at 1 48 59 AM" src="https://github.com/mintaekim33/digimall/assets/142648992/a1c8fefe-a02b-497a-a685-12ae8263b580"><br>
<img width="500" alt="Screenshot 2023-11-25 at 1 50 17 AM" src="https://github.com/mintaekim33/digimall/assets/142648992/3b02135e-c155-42ef-88af-867caab2811b"><br>
<img width="500" alt="Screenshot 2023-11-25 at 1 50 55 AM" src="https://github.com/mintaekim33/digimall/assets/142648992/05d57920-ddaa-429c-b6b8-b08ad441342c"><br>
<img width="500" alt="Screenshot 2023-11-25 at 1 55 11 AM" src="https://github.com/mintaekim33/digimall/assets/142648992/7c70d7e4-dd8c-44e7-abc8-bff82cd5d87e"><br>
<img width="500" alt="Screenshot 2023-11-25 at 1 55 35 AM" src="https://github.com/mintaekim33/digimall/assets/142648992/049533f2-59b0-4a79-8a2c-60f203bed645"><br>
<img width="500" alt="Screenshot 2023-11-25 at 1 55 56 AM" src="https://github.com/mintaekim33/digimall/assets/142648992/fd16d286-86a7-45c8-9cbf-f4590c84ca8e"><br>

# Technologies
React + Vite  
Airtable API  
Material UI  

# Demo Link
https://digimall.vercel.app/

# Trello Board
https://trello.com/b/wYkx4Enm/digimall

# Takeaways
- knowing how to read airtable (or any other) API documentation: important to read the documentation to use correct url parameters
- using specific (specific) variable names: this will help when the number of variables grow which may lead to name clashes
- understand when and where you need to send API requests: fetch data on page load / increment or decrement item quantity on button click / fetch data on parent component and pass down to child so the state is uplifted
- setState is asynchronous! Make use of async/await to get the expected behavior
- when trying to sync up frontend with backend, there are 2 ways to update the UI on frontend :
  1. fetch the most recent data from the server after sending the API request
  2. update the frontend state variable (assume API request succeeds)  -> optimistic rendering

# Challenges
- using the correct format for the body of the request in Airtable (e.g. including the 'fields' key)
- sync up of frontend and backend * 

# Next Steps
1. Implement authentication to store customers' information on backend
2. Use a more extensive database



















This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
