var db=require('../dbconnection'); //reference of dbconnection.js

var Category={

    getAllCategories:function(callback){
        return db.query("SELECT c.*, sc.sub_category_id, sc.sub_category_name FROM category c LEFT JOIN sub_category sc ON c.category_id = sc.category_id ORDER BY c.category_id, sc.sub_category_id",callback);
    },
    
    getCategoryById:function(categoryId, callback){
        return db.query("SELECT * FROM category WHERE category_id=? ",[categoryId],callback);
    },

    addCategory:function(Category, callback){
        return db.query("INSERT INTO category VALUES(?,?)",[0, Category.category_name],callback);
    },

    addSubCategory:function(Subcategory, callback){
        return db.query("INSERT INTO sub_category VALUES(?,?,?)",[Subcategory.category_id, 0, Subcategory.sub_category_name],callback);
    },

    updateCategory:function(Category,callback){
        return db.query("UPDATE category SET category_name = ? WHERE category_id=?",[Category.category_name, Category.category_id],callback);
    },

    updateSubCategory:function(Subcategory,callback){
        return db.query("UPDATE sub_category SET sub_category_name = ? WHERE category_id=? AND sub_category_id =?",[Subcategory.sub_category_name, Subcategory.category_id, Subcategory.sub_category_id],callback);
    },

    deleteCategory:function(Category,callback){
        return db.query("DELETE FROM category WHERE category_id=?",[Category.category_id],callback);
    },

    deleteSubCategory:function(Subcategory,callback){
        return db.query("DELETE FROM sub_category WHERE category_id=? AND sub_category_id=?",[Subcategory.category_id, Subcategory.sub_category_id],callback);
    }
};
module.exports=Category;