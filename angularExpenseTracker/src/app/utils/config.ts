export const config = {
  CONSTANTS: {
    ROUTES: {
      HOME: { link: '', name: "Add Expense", icon: "playlist_add" },
      VIEW: { link: 'view-expense', name: "View Expenses", icon: "view_timeline" }
    },
    TYPES: [
      { value: 'petty', text: 'Petty Expenses' },
      { value: 'groceries', text: 'Groceries' },
      { value: 'electronics', text: 'Electronics' },
      { value: 'fresh', text: 'Daily Fresh' },
      { value: 'food', text: 'Food' },
      { value: 'misc', text: 'Misc' },
    ]
  }
}
