package study.shoppingCollector.service;

import study.shoppingCollector.model.dto.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface TestService {
    List<Category> getAllCategoryList(User user);

    List<Item> getItemInCategory(Category category);

    Category getCategory(Category category);

    User findByUser(String email);

    Integer insertCategory(Category category);

    Integer deleteCategory(Category category);

    boolean insertItem(Item item);

    List<Item> selectAllItems(int user_id);

    String selectCategoryName(int user_id);

    List<Item> selectChildItem(Item item);

    Integer insertChild(Composite composite);

    Item selectOneItem(Object object);

    Integer deleteProduct(String name);

    void deleteChild(Composite composite);

}
