# Radical consistency

To 


# Data only travels down

The components may receive data from the page regarding which data needs to be updated in the database. However, the page does not receive data from the component, ensuring we have a single way dependency tree. 

---     page    ---
               l
component      l
   l           l    
   v           v
---       db       ---