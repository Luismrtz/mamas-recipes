import mongoose from 'mongoose';



// const ingredientSchema = new mongoose.Schema({
//     ingredientName: {
//         type: String,
//         maxlength: 25
//       },
//       quantity: {
//         type: Number,
//         default: 0,
//         min: 0,
//         max: 9999
//       },
//       type: {
//         type: String, // Ingredient type example: lb/kg/cups/tbsp
//         trim: true,
//         required: true,
//         maxlength: 10
//       }
//     });
    
    // const instructionSchema = new mongoose.Schema({
    //   order: Number,
    //   step: {
    //     type: String,
    //     required: true,
    //     maxlength: 2000
    //   }
    // });

    //test
    

//     //* v1
//     const recipeSchema = new mongoose.Schema(
//       {
//         nameOfRecipe: {
//           type: String,
//           trim: true,
//           required: true,
//           maxlength: 32
//         },
//         description: {
//           type: String,
//           trim: true,
//           required: true,
//         },
//         ingredients: {
//           type:String,
//           required: true,
//         },
//         instructions: {
//           type: String,
//           required: true,
//         }
//       },
//       { timestamps: true }
//     );

//   recipeSchema.index({nameOfRecipe: 'text', description: 'text'})
// const recipeModel = mongoose.model("Recipe", recipeSchema);

// export default recipeModel;


// * v2
const ingredientSchema = new mongoose.Schema({
  ingredient: {
    type: String,
    required: true,
    maxlength: 25
  }
});

const instructionSchema = new mongoose.Schema({
  step: {
    type: String,
    required: true,
    maxlength: 2000
  }
});

const recipeSchema = new mongoose.Schema(
  {
    nameOfRecipe: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    ingredients: [ingredientSchema],
    instructions: [instructionSchema],

    dessert: {
      type: Boolean,
      required: true,
      default: false
  
  },
     beverage: {
      type: Boolean,
      required: true,
      default: false
  
  },
     dish: {
      type: Boolean,
      required: true,
      default: false
  
  },
  },

  { timestamps: true }
);

recipeSchema.index({nameOfRecipe: 'text', description: 'text'})
const recipeModel = mongoose.model("Recipe", recipeSchema);

export default recipeModel;




//* v3
// const ingredientSchema = new mongoose.Schema({
//   ingredientName: {
//     type: String,
//     maxlength: 25
//   },
//   quantity: {
//     type: Number,
//     default: 0,
//     min: 0,
//     max: 9999
//   },
//   type: {
//     type: String, // Ingredient type example: lb/kg/cups/tbsp
//     trim: true,
//     required: true,
//     maxlength: 10
//   }
// });

// const instructionSchema = new mongoose.Schema({
//   order: Number,
//   step: {
//     type: String,
//     required: true,
//     maxlength: 2000
//   }
// });

// const recipeSchema = new mongoose.Schema(
//   {
//     nameOfRecipe: {
//       type: String,
//       trim: true,
//       required: true,
//       maxlength: 32
//     },
//     description: {
//       type: String,
//       trim: true,
//       required: true,
//       maxlength: 32
//     },
//     ingredients: [ingredientSchema],
//     instructions: [instructionSchema]
//   },
//   { timestamps: true }
// );