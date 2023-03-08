package study.shoppingCollector.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import study.shoppingCollector.model.dao.Mapper;
import study.shoppingCollector.model.dto.Category;
import study.shoppingCollector.model.dto.ChangeParameter;
import study.shoppingCollector.model.dto.UpdateCategoryName;

@Service
@RequiredArgsConstructor
public class ChangeServiceImpl implements ChangeService{

    private final Mapper mapper;

    @Override
    public Category getCategory(Category category) {
        return mapper.getCategory(category);
    }

    @Override
    public boolean updateCategoryName(UpdateCategoryName param) {
        return mapper.updateCategoryName(param);
    }

    @Override
    public boolean updateProductName(ChangeParameter param) {
        return mapper.updateProductName(param);
    }

    @Override
    public boolean updateManufacturer(ChangeParameter param) {
        return mapper.updateManufacturer(param);
    }

    @Override
    public boolean updateWarehouseDate(ChangeParameter param) {
        return mapper.updateWarehouseDate(param);
    }

    @Override
    public boolean updateCategory(ChangeParameter param) {
        return false;
    }

    @Override
    public boolean updateUnit(ChangeParameter param) {
        return false;
    }
}
