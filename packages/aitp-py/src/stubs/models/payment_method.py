# coding: utf-8

"""
    AITP Payments

    AITP Payments Specification

    The version of the OpenAPI document: 1.0.0
    Generated by OpenAPI Generator (https://openapi-generator.tech)

    Do not edit the class manually.
"""  # noqa: E501


from __future__ import annotations
import pprint
import re  # noqa: F401
import json



from pydantic import BaseModel, Field, StrictStr, validator

class PaymentMethod(BaseModel):
    """
    PaymentMethod
    """
    type: StrictStr = Field(default=..., description="Type of payment method")
    token: StrictStr = Field(default=..., description="Token contract address")
    recipient: StrictStr = Field(default=..., description="Recipient account or address")
    __properties = ["type", "token", "recipient"]

    @validator('type')
    def type_validate_enum(cls, value):
        """Validates the enum"""
        if value not in ('near_payment_channel',):
            raise ValueError("must be one of enum values ('near_payment_channel')")
        return value

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
    def from_json(cls, json_str: str) -> PaymentMethod:
        """Create an instance of PaymentMethod from a JSON string"""
        return cls.from_dict(json.loads(json_str))

    def to_dict(self):
        """Returns the dictionary representation of the model using alias"""
        _dict = self.dict(by_alias=True,
                          exclude={
                          },
                          exclude_none=True)
        return _dict

    @classmethod
    def from_dict(cls, obj: dict) -> PaymentMethod:
        """Create an instance of PaymentMethod from a dict"""
        if obj is None:
            return None

        if not isinstance(obj, dict):
            return PaymentMethod.parse_obj(obj)

        _obj = PaymentMethod.parse_obj({
            "type": obj.get("type"),
            "token": obj.get("token"),
            "recipient": obj.get("recipient")
        })
        return _obj


