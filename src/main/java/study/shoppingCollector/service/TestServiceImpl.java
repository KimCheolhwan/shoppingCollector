package study.shoppingCollector.service;

import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import study.shoppingCollector.model.dao.TestMapper;
import study.shoppingCollector.model.dto.Category;
import study.shoppingCollector.model.dto.User;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TestServiceImpl implements TestService{

    private final TestMapper testMapper;

    @Autowired
    private SqlSessionTemplate mybatis;

    @Override
    public List<Category> getAllCategoryList(User user) {
        return testMapper.getAllCategoryList(user);
    }
}
