package study.shoppingCollector.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import study.shoppingCollector.model.dao.Mapper;
import study.shoppingCollector.model.dto.*;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TestServiceImpl implements TestService{

    private final Mapper mapper;

    @Override
    public List<Category> getAllCategoryList(User user) {
        return mapper.getAllCategoryList(user);
    }

    @Override
    public List<Item> getItemInCategory(Category category) {
        return mapper.getItemInCategory(category);
    }

    @Override
    public Category getCategory(Category category) {
        return mapper.getCategory(category);
    }

    @Override
    public User findByUser(User user) {
        return mapper.findByUser(user);
    }

    @Override
    public void insertCategory(Category category) {
        mapper.insertCategory(category);
    }

    @Override
    public void deleteCategory(Category category) {mapper.deleteCategory(category);
    }

    @Override
    public void insertItem(Item item) {
        mapper.insertItem(item);
    }

    @Override
    public List<Item> selectAllItems(int user_id) {
        return mapper.selectAllItems(user_id);
    }

    @Override
    public String selectCategoryName(int user_id) {
        return mapper.selectCategoryName(user_id);
    }

    @Override
    public List<Item> selectChildItem(Item item) {
        return mapper.selectChildItem(item);
    }

    @Override
    public void insertChild(Composite composite) {mapper.insertChild(composite);
    }

    @Override
    public Item selectOneItem(Object object) {
        return mapper.selectOneItem(object);
    }

    @Override
    public void deleteProduct(String name) {
        mapper.deleteProduct(name);
    }

    @Override
    public void deleteChild(Composite composite) {
        mapper.deleteChild(composite);
    }
}
