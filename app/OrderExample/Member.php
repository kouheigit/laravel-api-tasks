<?php

final class Member{
    public function __construct(
        private HitPoint $hitPoint,
        private array $states = []
    ){}

    public function damage(int $damageAmount): self
    {
        $nextHitPoint = $this->hitPoint->damage($damageAmount);

        $nextStates = $this->states;

        if($nextHitPoint->isZero()){
            $nextStates[] = 'dead';
        }
        return new self($nextHitPoint, $nextStates);
    }
    public function hitPoint(): HitPoint
    {
        return $this->hitPoint;
    }
    public function states(): array
    {
        return $this->states;
    }
}

