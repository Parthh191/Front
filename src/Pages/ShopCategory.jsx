import React, { useContext } from 'react';
import './CSS/ShopCategroy.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  const { allProduct } = useContext(ShopContext);
  return (
    <div className='shop-category'>
      <img className='shopcategory-benner' src={props.banner} alt="Banner"   />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="Drop down" />
        </div>
      </div>
      <div className="shopcategroy-products">
        {allProduct ? (
          allProduct.map((item) => {
            if (props.category === item.category) {
              return (
                <Item
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
              );
            }
            return null; // Explicitly return null if condition fails
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  );
};

export default ShopCategory;
