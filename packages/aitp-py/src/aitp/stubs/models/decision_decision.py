# coding: utf-8

"""
    AI Decision Protocol

    AI Decision Protocol Specification

    The version of the OpenAPI document: 1.0.0
    Generated by OpenAPI Generator (https://openapi-generator.tech)

    Do not edit the class manually.
"""  # noqa: E501


from __future__ import annotations
import pprint
import re  # noqa: F401
import json


from typing import List, Optional
from pydantic import BaseModel, Field, StrictStr, conlist
from aitp.stubs.models.selected_option import SelectedOption

class DecisionDecision(BaseModel):
    """
    DecisionDecision
    """
    request_decision_id: Optional[StrictStr] = None
    options: conlist(SelectedOption, min_items=1) = Field(...)
    additional_properties: Dict[str, Any] = {}
    __properties = ["request_decision_id", "options"]

    class Config:
        """Pydantic configuration"""
        allow_population_by_field_name = True
        validate_assignment = True

    def to_str(self) -> str:
        """Returns the string representation of the model using alias"""
        return pprint.pformat(self.dict(by_alias=True))

    def to_json(self) -> str:
        """Returns the JSON representation of the model using alias"""
        return json.dumps(self.to_dict())

    @classmethod
    def from_json(cls, json_str: str) -> DecisionDecision:
        """Create an instance of DecisionDecision from a JSON string"""
        return cls.from_dict(json.loads(json_str))

    def to_dict(self):
        """Returns the dictionary representation of the model using alias"""
        _dict = self.dict(by_alias=True,
                          exclude={
                            "additional_properties"
                          },
                          exclude_none=True)
        # override the default output from pydantic by calling `to_dict()` of each item in options (list)
        _items = []
        if self.options:
            for _item in self.options:
                if _item:
                    _items.append(_item.to_dict())
            _dict['options'] = _items
        # puts key-value pairs in additional_properties in the top level
        if self.additional_properties is not None:
            for _key, _value in self.additional_properties.items():
                _dict[_key] = _value

        return _dict

    @classmethod
    def from_dict(cls, obj: dict) -> DecisionDecision:
        """Create an instance of DecisionDecision from a dict"""
        if obj is None:
            return None

        if not isinstance(obj, dict):
            return DecisionDecision.parse_obj(obj)

        _obj = DecisionDecision.parse_obj({
            "request_decision_id": obj.get("request_decision_id"),
            "options": [SelectedOption.from_dict(_item) for _item in obj.get("options")] if obj.get("options") is not None else None
        })
        # store additional fields in additional_properties
        for _key in obj.keys():
            if _key not in cls.__properties:
                _obj.additional_properties[_key] = obj.get(_key)

        return _obj


