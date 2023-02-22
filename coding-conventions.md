# Coding Conventions


## Casing
Our coding conventions follow a consistent naming scheme to improve code readability and maintainability. 

In our PostgreSQL databases, we use kebab_case for all table and column names, where words are separated by hyphens. For example, `order_items`, `user_email`. This naming convention helps to ensure consistency and clarity in our database design.

All variable names and component names are written in camelCase, where words are joined together and the first letter of each subsequent word is capitalized. For example, `firstName`, `totalAmount`, `userEmail`.

Tha means that accessing the ```profiles``` table would look something like this: 
```
  const { data } = await supabase
    .from('accounts')
    .select('user_id, first_name, last_name')
    .single()
   
  const firstName = data.first_name;
  const lastName = data.last_name;

  ok.log('success', 'got the user profile of' + firstName + ' ' + lastName)
```


## Comments

We strive to keep code comments at a bare minimum because when code is written in a clear, concise manner with meaningful variable and function names, comments are often unnecessary. Comments can even become a liability if they are not kept up-to-date with changes to the code. Additionally, over-reliance on comments can lead to "comment rot" where the comments are no longer accurate or relevant. Instead, we aim to write code that is self-explanatory and easy to understand without the need for extensive comments. When comments are necessary, we make sure they are concise, accurate, and maintained over time.

Beneath is an example where comments are used to compensate for poorly written code. 
1. It does not show any information regarding what the ```x``` variable stands for
2. It does not tell you what ```x===0```, ```x===1```, or ```x===3``` means
3. It does not tell you if x is the same in the ```getTransactionTypeClass``` and ```getTransactionType``` context:

```
// the functions below translate the transaction type id to
// either a name or a symbol. 
// 0=a deposit
// 1=a withdrawal
// 3=a dividend
// the arrows can be found at https://arrowsymbol.com/

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

Beneath is an improved version
1. Declared variables clearly show which number equals which type of transaction
2. Function names tell you what you are getting; icon or name
3. ```x``` has been changed to ```type``` 

```
  const deposit = 0;
  const withdraw = 1;
  const dividend = 2;
  
  function getTransactionTypeIcon(type){ 
    if (type===deposit) return "→"
    if (type===withdraw) return "←"
    if (type===dividend) return "↗"
  }
  function getTransactionTypeName(type){ 
    if (type===deposit) return "deposit"
    if (type===withdraw) return "withdrawal"
    if (type===dividend) return "dividend"
  }
```
