# Coding Conventions


## Casing
Our coding conventions follow a consistent naming scheme to improve code readability and maintainability. All variable names and component names are written in camelCase, where words are joined together and the first letter of each subsequent word is capitalized. For example, `firstName`, `totalAmount`, `userEmail`.

In our PostgreSQL databases, we use kebab_case for all table and column names, where words are separated by hyphens. For example, `order_items`, `user_email`. This naming convention helps to ensure consistency and clarity in our database design.

By adhering to these naming conventions, we can make our code more understandable and easier to maintain over time.

## Comments

Comment should not be necessarry to explain code unless 

This is bad code, it does not show any information regarding what the ```x``` variable stands for, nor does it tell you what x===0,1 or 3 stands for:
```
  function getTransactionType(x){ 
    if (x===0) return "→"
    if (x===1) return "←"
    if (x===3) return "↗"
  }
```

Since the x===0,1 and 3 are defined in the function above, it might seem good enough, but you still ahve to know that x in ```getTransactionTypeClass``` is the same as in ```getTransactionType```:
```
  function getTransactionTypeClass(x){ 
    if (x===0) return "deposit"
    if (x===1) return "withdrawal"
    if (x===3) return "dividend"
  }
  function getTransactionType(x){ 
    if (x===0) return "→"
    if (x===1) return "←"
    if (x===3) return "↗"
  }
```


```
  const deposit = 0;
  const withdraw = 1;
  const dividend = 2;
  function getTransactionTypeIcon(typeId){ 
    if (typeId===deposit) return "→"
    if (typeId===withdraw) return "←"
    if (typeId===dividend) return "↗"
  }
  function getTransactionTypeName(typeId){ 
    if (typeId===deposit) return "deposit"
    if (typeId===withdraw) return "withdrawal"
    if (typeId===dividend) return "dividend"
  }
```
