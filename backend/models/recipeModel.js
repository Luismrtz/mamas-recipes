import mongoose from 'mongoose';




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
    img: {
      type: String,
      required: false,

  },
  time: {
    type: String,
    required: false
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


