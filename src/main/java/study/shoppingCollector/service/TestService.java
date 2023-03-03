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
}
