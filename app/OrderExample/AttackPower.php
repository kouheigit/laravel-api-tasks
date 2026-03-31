<?php
final class AttackPower
{
    private const MIN = 0;

    public function __construct(private int $value) {
        if ($value < self::MIN) {
            throw new InvalidArgumentException('攻撃力は0以上');
        }
    }

    public function value(): int
    {
        return $this->value;
    }

    public function enhance(self $increment): self
    {
        return new self($this->value + $increment->value);
    }

    public function disable(): self
    {
        return new self(self::MIN);
    }
}

/*
/*
 * 悪い例
class AttackPower
{
    private const MIN = 0;

    public int $value;

    public function __construct(int $value)
    {
        if($value < self::MIN){
            throw new \http\Exception\InvalidArgumentException();
        }
        $this->value = $value;
    }

    public function enhance(int $increment): void
    {
        $this->value += $increment;//←直接変更
    }

    public function disable(): void
    {
        $this->value = self::MIN;//←直接変更
    }
}*/


