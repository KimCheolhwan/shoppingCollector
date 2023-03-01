package study.shoppingCollector.model.dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import study.shoppingCollector.model.dto.Category;
import study.shoppingCollector.model.dto.Item;
import study.shoppingCollector.model.dto.User;

import java.util.List;

@Repository
@Mapper
public interface TestMapper {
    List<Category> getAllCategoryList(User user);

    List<Item> getItemInCategory(Category category);

    int getCategoryId(String categoryName);

//    boolean findByUser(String email);
}
