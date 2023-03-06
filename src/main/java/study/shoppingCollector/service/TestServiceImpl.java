package study.shoppingCollector.service;

import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import study.shoppingCollector.model.dao.TestMapper;
import study.shoppingCollector.model.dto.Category;
import study.shoppingCollector.model.dto.Composite;
import study.shoppingCollector.model.dto.Item;
import study.shoppingCollector.model.dto.User;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TestServiceImpl implements TestService{

    private final TestMapper testMapper;

    @Override
    public List<Category> getAllCategoryList(User user) {
        return testMapper.getAllCategoryList(user);
    }

    @Override
    public List<Item> getItemInCategory(Category category) {
        return testMapper.getItemInCategory(category);
    }

    @Override
    public Category getCategory(Category category) {
        return testMapper.getCategory(category);
    }

    @Override
    public User findByUser(String email) {
        return testMapper.findByUser(email);
    }

    @Override
    public Integer insertCategory(Category category) {
        return testMapper.insertCategory(category);
    }

    @Override
    public Integer deleteCategory(Category category) {
        return testMapper.deleteCategory(category);
    }
//
    @Override
    public boolean updateCategoryName(HashMap<String, String> map) {
        return testMapper.updateCategoryName(map);
    }

    @Override
    public boolean insertItem(Item item) {
        return testMapper.insertItem(item);
    }

    @Override
    public List<Item> selectAllItems(int user_id) {
        return testMapper.selectAllItems(user_id);
    }

    @Override
    public String selectCategoryName(int user_id) {
        return testMapper.selectCategoryName(user_id);
    }

    @Override
    public boolean updateProductName(HashMap<String, Object> map) {
        return testMapper.updateProductName(map);
    }

    @Override
    public boolean updateManufacturer(HashMap<String, Object> map) {
        return testMapper.updateManufacturer(map);
    }

    @Override
    public boolean updateWarehouseDate(HashMap<String, Object> map) {
        return testMapper.updateWarehouseDate(map);
    }

    @Override
    public boolean updateCategory(HashMap<String, Object> map) {
        return testMapper.updateCategory(map);
    }

    @Override
    public boolean updateUnit(HashMap<String, Object> map) {
        return testMapper.updateUnit(map);
    }

    @Override
    public List<Item> selectChildItem(Item item) {
        return testMapper.selectChildItem(item);
    }

    @Override
    public Integer insertChild(Composite composite) {
        return testMapper.insertChild(composite);
    }

    @Override
    public Item selectOneItem(Object object) {
        return testMapper.selectOneItem(object);
    }

    @Override
    public Integer deleteProduct(String name) {
        return testMapper.deleteProduct(name);
    }

    @Override
    public void deleteChild(Composite composite) {
        testMapper.deleteChild(composite);
    }
}
