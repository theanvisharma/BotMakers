package com.authapp.mapper;

import com.authapp.dto.RegisterRequest;
import com.authapp.dto.UserDto;
import com.authapp.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

    @Mapping(target = "password", ignore = true)
    User toEntity(RegisterRequest request);

    UserDto toDto(User user);
}
