package study.shoppingCollector.service;

import study.shoppingCollector.model.dto.Category;
import study.shoppingCollector.model.dto.User;

import java.util.List;

public interface TestService {
    public List<Category> getAllCategoryList(User user);
}
