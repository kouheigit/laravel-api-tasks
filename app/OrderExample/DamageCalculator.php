<?php
class DamageCalculator
{
    public function calculate(
        int $playerBodyPower,
        int $playerWeaponPower,
        int $enemyBodyDefence,
        int $enemyArmorDefence
    ): int {
        $attack = $this->calculateAttack(
            $playerBodyPower,
            $playerWeaponPower
        );

        $defence = $this->calculateDefence(
            $enemyBodyDefence,
            $enemyArmorDefence
        );

        return $this->calculateDamage($attack, $defence);
    }

    private function calculateAttack(int $body, int $weapon): int
    {
        return $body + $weapon;
    }

    private function calculateDefence(int $body, int $armor): int
    {
        return $body + $armor;
    }

    private function calculateDamage(int $attack, int $defence): int
    {
        return max(0, $attack - $defence);
    }
}
