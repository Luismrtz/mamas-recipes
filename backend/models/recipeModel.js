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
          maxlength: 32
        },
        ingredients: {
          type:String,
          required: true,
        },
        instructions: {
          type: String,
          required: true,
        }
      },
      { timestamps: true }
    );

  recipeSchema.index({nameOfRecipe: 'text', description: 'text'})
const recipeModel = mongoose.model("Recipe", recipeSchema);

export default recipeModel;





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