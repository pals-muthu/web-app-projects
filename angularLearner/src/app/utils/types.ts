export interface PeriodicElement {
  name: String;
  position: Number;
  weight: Number;
  symbol: String;
}

export interface LearnerObject {
  arr: PeriodicElement[]
}

export interface RecipeItem  {
  id: String,
  name: String,
  description: String,
  image: string,
  recipe: String
}
