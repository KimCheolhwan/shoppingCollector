package study.shoppingCollector.service;

import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import study.shoppingCollector.model.dao.TestMapper;
import study.shoppingCollector.model.dto.Category;
import study.shoppingCollector.model.dto.Item;
import study.shoppingCollector.model.dto.User;

import java.util.List;

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
    public int getCategoryId(String categoryName) {
        return testMapper.getCategoryId(categoryName);
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
}
