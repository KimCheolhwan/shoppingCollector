package study.shoppingCollector.service;

import study.shoppingCollector.model.dto.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface TestService {
    List<Category> getAllCategoryList(User user);

    List<Item> getItemInCategory(Category category);

    Category getCategory(Category category);

    User findByUser(User user);

    void insertCategory(Category category);

    void deleteCategory(Category category);

    void insertItem(Item item);

    List<Item> selectAllItems(int user_id);

    String selectCategoryName(int user_id);

    List<Item> selectChildItem(Item item);

    void insertChild(Composite composite);

    Item selectOneItem(Object object);

    void deleteProduct(String name);

    void deleteChild(Composite composite);

}
