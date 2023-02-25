package study.shoppingCollector.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import study.shoppingCollector.model.dao.TestMapper;
import study.shoppingCollector.model.dto.Category;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TestServiceImpl implements TestService{

    private final TestMapper testMapper;

    @Override
    public List<Category> getAllDataList() {
        return testMapper.getAllDataList();
    }
}
