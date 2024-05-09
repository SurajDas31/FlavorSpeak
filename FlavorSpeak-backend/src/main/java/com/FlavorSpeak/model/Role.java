package com.FlavorSpeak.model;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.*;
import java.util.stream.Collectors;

import static com.FlavorSpeak.model.Permission.*;

public enum Role {

    USER(Collections.emptySet()),
    ADMIN( new HashSet<>(Arrays.asList(new Permission[]{ADMIN_UPDATE, ADMIN_DELETE, ADMIN_CREATE, MANAGER_READ, MANAGER_UPDATE, MANAGER_DELETE, MANAGER_CREATE}))),
    MANAGER(new HashSet<>(Arrays.asList(new Permission[]{MANAGER_READ, MANAGER_UPDATE, MANAGER_DELETE, MANAGER_CREATE})));

    private final Set<Permission> permissions;

    Role(Set<Permission> permissions) {
        this.permissions = permissions;
    }

    public List<SimpleGrantedAuthority> getAuthorities() {
        List authorities = getPermissions()
                .stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toList());
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return authorities;
    }

    public Set<Permission> getPermissions() {
        return permissions;
    }
}