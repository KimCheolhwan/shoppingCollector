package study.shoppingCollector.model.dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import study.shoppingCollector.model.dto.Category;
import study.shoppingCollector.model.dto.Item;
import study.shoppingCollector.model.dto.User;

import java.util.HashMap;
import java.util.List;

@Repository
@Mapper
public interface TestMapper {
    List<Category> getAllCategoryList(User user);

    List<Item> getItemInCategory(Category category);

    Category getCategory(Category category);

    User findByUser(String email);

    Integer insertCategory(Category category);

    Integer deleteCategory(Category category);

    boolean updateCategoryName(HashMap<String, String> map);
}
