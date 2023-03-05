package study.shoppingCollector.service;

import study.shoppingCollector.model.dto.Category;
import study.shoppingCollector.model.dto.Item;
import study.shoppingCollector.model.dto.User;

import java.util.HashMap;
import java.util.List;

public interface TestService {
    public List<Category> getAllCategoryList(User user);

    public List<Item> getItemInCategory(Category category);

    Category getCategory(Category category);

    User findByUser(String email);

    Integer insertCategory(Category category);

    Integer deleteCategory(Category category);

    boolean updateCategoryName(HashMap<String, String> map);

    boolean insertItem(HashMap<String, Object> map);

    List<Item> selectAllItems(int user_id);

    String selectCategoryName(int user_id);

    boolean updateProductName(HashMap<String, Object> map);

    boolean updateManufacturer(HashMap<String, Object> map);

    boolean updateWarehouseDate(HashMap<String, Object> map);

    boolean updateCategory(HashMap<String, Object> map);

    boolean updateUnit(HashMap<String, Object> map);
}
