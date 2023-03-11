package study.shoppingCollector.model.dao;

import org.springframework.stereotype.Repository;
import study.shoppingCollector.model.dto.*;

import java.util.List;

@Repository
@org.apache.ibatis.annotations.Mapper
public interface Mapper {
    List<Category> getAllCategoryList(User user);

    List<Item> getItemInCategory(Category category);

    Category getCategory(Category category);

    User findByUser(User user);

    Integer insertCategory(Category category);

    Integer deleteCategory(Category category);

    boolean updateCategoryName(UpdateCategoryName param);

    boolean insertItem(Item item);

    List<Item> selectAllItems(int user_id);

    String selectCategoryName(int user_id);

    boolean updateProductName(ChangeParameter param);

    boolean updateManufacturer(ChangeParameter param);

    boolean updateWarehouseDate(ChangeParameter param);

    boolean updateCategory(ChangeParameter param);

    boolean updateUnit(ChangeParameter param);

    List<Item> selectChildItem(Item item);

    Integer insertChild(Composite composite);

    Item selectOneItem(Object object);

    Integer deleteProduct(String name);

    void deleteChild(Composite composite);
}
