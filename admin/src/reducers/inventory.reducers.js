import { inventoryConstants } from "../actions/constants";

const initState = {
  Categories: [],
  Products: [],
  loading: false,
  serverRes: "",
};

//dynamically building new categories
const buildNewCategory = (id, currCategories, newCategory) => {
  let myCategories = [];

  if (id === undefined) {
    return [
      ...currCategories,
      {
        _id: newCategory._id,
        name: newCategory.name,
        slug: newCategory.slug,
        children: [],
      },
    ];
  }

  for (let cat of currCategories) {
    if (cat._id === id) {
      myCategories.push({
        ...cat,
        children: cat.children
          ? buildNewCategory(
              id,
              [
                ...cat.children,
                {
                  _id: newCategory._id,
                  name: newCategory.name,
                  slug: newCategory.slug,
                  parentId: newCategory.parentId,
                  children: newCategory.children,
                },
              ],
              newCategory
            )
          : [],
      });
    } else {
      myCategories.push({
        ...cat,
        children: cat.children
          ? buildNewCategory(id, cat.children, newCategory)
          : [],
      });
    }
  }
  return myCategories;
};

//building new products
const buildNewProduct = (currProducts, latProd, CATobj) => {
  return [
    ...currProducts,
    {
      _id: latProd._id,
      name: latProd.name,
      category: CATobj,
      description: latProd.description,
      price: latProd.price,
      productPictures: latProd.productPictures,
      weight: latProd.weight,
      quantity: latProd.quantity,
    },
  ];
};

const inventoryReducer = (state = initState, action) => {
  // console.log(action);
  // eslint-disable-next-line
  switch (action.type) {
    //getting all categories
    case inventoryConstants.GETCAT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case inventoryConstants.GETCAT_SUCCESS:
      state = {
        ...state,
        Categories: action.payload.Categories,
        loading: false,
      };
      break;
    case inventoryConstants.GETCAT_FAILURE:
      state = {
        ...state,
        loading: false,
        serverRes: action.payload.Message,
      };
      break;

    //adding new category
    case inventoryConstants.ADDCAT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case inventoryConstants.ADDCAT_SUCCESS:
      const category = action.payload.category;
      const updatedCategories = buildNewCategory(
        category.parentId,
        state.Categories,
        category
      );
      state = {
        ...state,
        loading: false,
        Categories: updatedCategories,
        serverRes: action.payload.Message,
      };
      break;
    case inventoryConstants.ADDCAT_FAILURE:
      state = {
        ...state,
        loading: false,
        serverRes: action.payload.Message,
      };
      break;

    //updating categories
    case inventoryConstants.UPDCAT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case inventoryConstants.UPDCAT_SUCCESS:
      state = {
        ...state,
        loading: false,
        serverRes: action.payload.Message,
      };
      break;
    case inventoryConstants.UPDCAT_FAILURE:
      state = {
        ...state,
        loading: false,
        serverRes: action.payload.Message,
      };
      break;

    //deleting categories
    case inventoryConstants.DELCAT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case inventoryConstants.DELCAT_SUCCESS:
      state = {
        ...state,
        loading: false,
        serverRes: action.payload.Message,
      };
      break;
    case inventoryConstants.DELCAT_FAILURE:
      state = {
        ...state,
        loading: false,
        serverRes: action.payload.Message,
      };
      break;

    //getting all products
    case inventoryConstants.GETPROD_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case inventoryConstants.GETPROD_SUCCESS:
      state = {
        ...state,
        loading: false,
        Products: action.payload.Products,
        serverRes: action.payload.Message,
      };
      break;
    case inventoryConstants.GETPROD_FAILURE:
      state = {
        ...state,
        loading: false,
        serverRes: action.payload.Message,
      };
      break;

    //adding new product
    case inventoryConstants.ADDPROD_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case inventoryConstants.ADDPROD_SUCCESS:
      const newProd = action.payload.Product;
      const thisCat = action.payload.Cat;
      const newProduct = buildNewProduct(state.Products, newProd, thisCat);
      state = {
        ...state,
        loading: false,
        Products: newProduct,
        serverRes: action.payload.Message,
      };
      break;
    case inventoryConstants.ADDPROD_FAILURE:
      state = {
        ...state,
        loading: false,
        serverRes: action.payload.Message,
      };
      break;

    //deleting product by ID
    case inventoryConstants.DELPROD_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case inventoryConstants.DELPROD_SUCCESS:
      state = {
        ...state,
        loading: false,
        serverRes: action.payload.Message,
      };
      break;
    case inventoryConstants.DELPROD_FAILURE:
      state = {
        ...state,
        loading: false,
        serverRes: action.payload.Message,
      };
      break;

    //clearing state
    case inventoryConstants.CLEAR_STATE:
      state = {
        ...initState,
      };
      break;
  }
  return state;
};

export default inventoryReducer;
